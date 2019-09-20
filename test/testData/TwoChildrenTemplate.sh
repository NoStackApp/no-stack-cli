### USER CLASS ###
newUserClass user

### SOURCES ###
newSource  projectsForUser user
newSource  toDoSource user
connectSources toDoSource projectsForUser project

### TYPES ###
newType project projectsForUser user
newType toDo toDoSource project
newType team toDoSource project
newType isCompleted toDoSource toDo boolean singleRequired

### SELECTIONS ###
newSelection projectsForUser project
newSelection toDoSource toDo
newSelection toDoSource isCompleted

### CONSTRAINTS ###
newConstraint __currentUser__ projectsForUser user ID
newConstraint currentProjectId toDoSource project ID


