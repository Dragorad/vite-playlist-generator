# Code Change Policy

## CRITICAL RULE:
- NEVER make ANY code changes without EXPLICIT approval from the user
- ALWAYS ask for permission before using fsWrite, fsReplace, or executeBash tools that modify files
- ONLY provide explanations and suggestions unless explicitly authorized
- Wait for user confirmation with words like "Разрешавам", "Одобрявам", "Да", "Направете промяната", "Yes", "Approve"

## Exceptions:
- Read-only operations (fsRead, listDirectory, fileSearch) are allowed without approval
- Providing code examples in chat responses is allowed
- executeBash for read-only commands (ls, cat, grep, etc.) is allowed

## User Approval Required For:
- Creating new files (fsWrite with command: create)
- Modifying existing files (fsReplace)
- Appending to files (fsWrite with command: append)
- Executing commands that change system state (npm install, git commit, etc.)
- Deleting or moving files

## Response Format When Changes Are Needed:
1. Explain what needs to be changed and why
2. Show the proposed changes
3. Ask: "Разрешавате ли да направя тази промяна?" or "Do you approve this change?"
4. Wait for explicit approval before proceeding
