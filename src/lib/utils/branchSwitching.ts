export interface BranchConflict {
	file: string;
	localChanges: boolean;
	remoteChanges: boolean;
	conflict: boolean;
}

export interface BranchSwitchResult {
	success: boolean;
	conflicts?: BranchConflict[];
	error?: string;
}

export async function checkForConflicts(branchName: string): Promise<BranchSwitchResult> {
	try {
		// Get current branch status
		const currentResponse = await fetch('/api/branches/current');
		if (!currentResponse.ok) {
			return { success: false, error: 'Failed to get current branch' };
		}
		const currentData = await currentResponse.json();
		const currentBranch = currentData.branch;

		// Get file tree for current branch
		const currentTreeResponse = await fetch('/api/content/tree');
		if (!currentTreeResponse.ok) {
			return { success: false, error: 'Failed to get current file tree' };
		}
		const currentTree = await currentTreeResponse.json();

		// Switch to target branch temporarily to check
		const switchResponse = await fetch('/api/branches/switch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ branch: branchName })
		});

		if (!switchResponse.ok) {
			return { success: false, error: 'Failed to switch to target branch' };
		}

		// Get file tree for target branch
		const targetTreeResponse = await fetch('/api/content/tree');
		if (!targetTreeResponse.ok) {
			// Switch back before returning error
			await fetch('/api/branches/switch', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ branch: currentBranch })
			});
			return { success: false, error: 'Failed to get target file tree' };
		}
		const targetTree = await targetTreeResponse.json();

		// Switch back to original branch
		await fetch('/api/branches/switch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ branch: currentBranch })
		});

		// Compare trees to find conflicts
		const conflicts = compareTrees(currentTree.tree, targetTree.tree);

		return { success: true, conflicts };
	} catch (error) {
		console.error('Error checking for conflicts:', error);
		return { success: false, error: 'Failed to check for conflicts' };
	}
}

function compareTrees(currentTree: any[], targetTree: any[]): BranchConflict[] {
	const conflicts: BranchConflict[] = [];
	const currentFiles = flattenTree(currentTree);
	const targetFiles = flattenTree(targetTree);

	// Check all files that exist in either branch
	const allFiles = new Set([...Object.keys(currentFiles), ...Object.keys(targetFiles)]);

	for (const file of allFiles) {
		const currentFile = currentFiles[file];
		const targetFile = targetFiles[file];

		conflicts.push({
			file,
			localChanges: currentFile?.hasChanges || false,
			remoteChanges: targetFile?.hasChanges || false,
			conflict: currentFile && targetFile && 
				currentFile.hash !== targetFile.hash && 
				(currentFile.hasChanges || targetFile.hasChanges)
		});
	}

	return conflicts.filter(c => c.conflict);
}

function flattenTree(tree: any[], prefix = ''): Record<string, { hash: string; hasChanges: boolean }> {
	const result: Record<string, { hash: string; hasChanges: boolean }> = {};

	for (const node of tree) {
		if (node.type === 'file') {
			const path = prefix ? `${prefix}/${node.name}` : node.name;
			result[path] = {
				hash: node.hash || '',
				hasChanges: node.hasChanges || false
			};
		} else if (node.type === 'dir' && node.children) {
			const childPrefix = prefix ? `${prefix}/${node.name}` : node.name;
			Object.assign(result, flattenTree(node.children, childPrefix));
		}
	}

	return result;
}

export async function switchBranchWithConflictCheck(branchName: string): Promise<BranchSwitchResult> {
	// First check for conflicts
	const conflictCheck = await checkForConflicts(branchName);
	
	if (!conflictCheck.success) {
		return conflictCheck;
	}

	// If there are conflicts, return them for user to resolve
	if (conflictCheck.conflicts && conflictCheck.conflicts.length > 0) {
		return {
			success: false,
			conflicts: conflictCheck.conflicts,
			error: 'Branch switch would create conflicts. Please resolve conflicts first.'
		};
	}

	// No conflicts, proceed with switch
	try {
		const response = await fetch('/api/branches/switch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ branch: branchName })
		});

		if (!response.ok) {
			return { success: false, error: 'Failed to switch branch' };
		}

		return { success: true };
	} catch (error) {
		console.error('Error switching branch:', error);
		return { success: false, error: 'Failed to switch branch' };
	}
}
