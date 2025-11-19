GET     /api/teams/:teamId              # Get team details
PUT     /api/teams/:teamId              # Update team
DELETE  /api/teams/:teamId              # Delete team
GET     /api/teams/:teamId/members      # List team members
POST    /api/teams/:teamId/members      # Add member
PUT     /api/teams/:teamId/members/:userId  # Update member role
DELETE  /api/teams/:teamId/members/:userId  # Remove member
GET     /api/teams/:teamId/invitations  # Pending invitations
POST    /api/teams/:teamId/invitations  # Send invitation
DELETE  /api/teams/invitations/:invitationId  # Cancel invitation
POST    /api/teams/invitations/:token/accept  # Accept invitation
POST    /api/teams/invitations/:token/decline # Decline invitation


GET     /api/teams/:teamId/projects     # List team projects
POST    /api/teams/:teamId/projects     # Create project
GET     /api/projects/:projectId        # Get project details
PUT     /api/projects/:projectId        # Update project
DELETE  /api/projects/:projectId        # Delete project
GET     /api/projects/:projectId/stats  # Project statistics
POST    /api/projects/:projectId/collaborators  # Add collaborator
DELETE  /api/projects/:projectId/collaborators/:userId # Remove collaborator
GET     /api/projects/:projectId/activity # Project activity log

GET     /api/projects/:projectId/tasks  # List project tasks
POST    /api/projects/:projectId/tasks  # Create task
GET     /api/tasks/:taskId              # Get task details
PUT     /api/tasks/:taskId              # Update task
DELETE  /api/tasks/:taskId              # Delete task
PUT     /api/tasks/:taskId/status       # Update task status
PUT     /api/tasks/:taskId/assign       # Assign/unassign users
PUT     /api/tasks/:taskId/priority     # Update priority
PUT     /api/tasks/:taskId/due-date     # Update due date
GET     /api/tasks/:taskId/history      # Task history
POST    /api/tasks/:taskId/duplicate    # Duplicate task
PUT     /api/tasks/:taskId/move         # Move to different project
GET     /api/tasks/search?q=query       # Search tasks
GET     /api/tasks/filter?status=open&assignee=userId # Filter tasks


GET     /api/tasks/:taskId/comments     # List task comments
POST    /api/tasks/:taskId/comments     # Add comment
PUT     /api/comments/:commentId        # Update comment
DELETE  /api/comments/:commentId        # Delete comment
POST    /api/comments/:commentId/reactions # Add reaction
DELETE  /api/comments/:commentId/reactions # Remove reaction

GET     /api/notifications              # List user notifications
PUT     /api/notifications/:id/read     # Mark as read
PUT     /api/notifications/read-all     # Mark all as read
DELETE  /api/notifications/:id          # Delete notification
GET     /api/notifications/unread-count # Unread count
POST    /api/notifications/preferences  # Update notification settings