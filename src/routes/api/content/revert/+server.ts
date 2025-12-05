import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

/**
 * Revert a file in the workspace to its state on main branch.
 * - If file exists on main: overwrite workspace version with main version
 * - If file doesn't exist on main: delete from workspace (it was added in workspace)
 */
export async function POST({ request, cookies }) {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const session = JSON.parse(sessionCookie);
		
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			return json({ error: 'Session expired' }, { status: 401 });
		}

		const { path } = await request.json();

		if (!path) {
			return json({ error: 'Path is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });
		const branch = session.currentBranch || `${session.user.login}/workspace`;
		const repoPath = path.startsWith('content/') ? path : `content/${path}`;

		// Try to get the file from main branch
		let mainContent: string | null = null;
		
		try {
			const { data: mainFile } = await octokit.rest.repos.getContent({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: repoPath,
				ref: 'main'
			});

			if ('content' in mainFile && typeof mainFile.content === 'string') {
				mainContent = Buffer.from(mainFile.content, 'base64').toString('utf-8');
			}
		} catch (error) {
			// File doesn't exist on main - this means it was added in the workspace
			if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 404) {
				mainContent = null;
			} else {
				throw error;
			}
		}

		// Get the current file from workspace branch to get its SHA
		let workspaceSha: string | null = null;
		try {
			const { data: workspaceFile } = await octokit.rest.repos.getContent({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: repoPath,
				ref: branch
			});

			if ('sha' in workspaceFile) {
				workspaceSha = workspaceFile.sha;
			}
		} catch (error) {
			// File doesn't exist in workspace - nothing to revert
			if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 404) {
				return json({ error: 'File not found in workspace' }, { status: 404 });
			}
			throw error;
		}

		if (mainContent !== null) {
			// File exists on main - overwrite workspace version with main version
			await octokit.rest.repos.createOrUpdateFileContents({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: repoPath,
				message: `Revert ${repoPath} to main`,
				content: Buffer.from(mainContent).toString('base64'),
				sha: workspaceSha!,
				branch
			});

			return json({ 
				success: true, 
				action: 'reverted',
				message: `Reverted ${path} to main branch version`
			});
		} else {
			// File doesn't exist on main - delete from workspace
			await octokit.rest.repos.deleteFile({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: repoPath,
				message: `Remove ${repoPath} (reverting to main state)`,
				sha: workspaceSha!,
				branch
			});

			return json({ 
				success: true, 
				action: 'deleted',
				message: `Removed ${path} (file doesn't exist on main)`
			});
		}

	} catch (error) {
		console.error('Failed to revert file:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Failed to revert file' },
			{ status: 500 }
		);
	}
}
