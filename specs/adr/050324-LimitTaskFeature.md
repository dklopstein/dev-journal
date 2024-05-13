# Limiting Tasks Decision

- During the 050324-pitchdraft meeting, group debated how much functionality tasks would have
- Considering that we wanted the focus of our app to be Journaling, how much complexity should we give the tasks feature?

### The Delimma
Tasks are certainly a feature of our app. However, what attributes should a task have?
- We can give tasks a name, deadline, and notes.
- Tasks must have a name so that's not up for debate.
- If we give tasks deadlines, it implies that the user would want to assign tasks for days in the future.
If we let users assign tasks for certain days, there should be that functionality on the calendar interface.
If we're giving users access to a calendar interface similar to something like Google Calendar, users might
want the option to set repeating events, or add notifications for events, or set time ranges for events. Pretty
soon, the app will become just like Google Calendar.
- Similarly with notes, this takes away from the minimalism of our design. If we offer users to add notes
to their tasks, are they able to edit the notes, are the notes always displayed on the task list view? There
comes a lot of implications if we add notes.

**Decision**: We decided to only assign names to tasks. This way, users can very conveniently add tasks that
are on their mind, rather than planning out all tasks they have to do on particular days in the future. These
tasks are more like post-it notes that someone might have on their desk, that way the focus of our app is on 
journaling.
