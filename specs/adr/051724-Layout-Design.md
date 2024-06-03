# Past Week View on Homepage
Decision occured during weekly meeting on May 17th, Friday\

Group decided on a couple design choices
1. On the homepage, should the past week view be on the side or at the bottom?
2. Should the task list continuously shrink with the window? Or should it collapse at some point?
3. Should we build a completely separate layout that works with small screens? i.e. phones, tablets

### 1.
Initial design of homepage included a box on the right side of the screen displaying a preview of the tasks
completed and the ratings for that day for the past week.\
Now that we're building the layout, we're seeing that this may cause the layout to be too compressed at
smaller window sizes.\
Team took a vote and decided to put it at the bottom of the screen and vertically shrink the Journal, the 
Ratings, and the Tasks Completed Today boxes.\
This will allow for easier resizing and responsiveness with changing window sizes. This also allows for some 
aesthetic whitespace on the right side of the page at larger window sizes.

### 2.
Initial design of the homepage and calendar pages was to have the task list stick to the left side of the
screen so that it's readily available for the user at all times. This was decided as the task list contains
important tasks that the user would like to be able to check multiple times per day, similar to a post-it
note on the user's desk.
Now that we're implementing the layout, we see that the task list shrinks significantly and crams the rest of 
the homepage and calendar when the window size is smaller.
After debate, we decided that the task list should collapse at a point where the interface becomes too 
cramped. There will be a button to expand and re-collapse the collapsed task list so that users can still 
reference it even when their window size is too small.

### 3.
The question of whether we would like to build a layout accessible for users on devices with smaller screens
came up. Ideally, we would have a version of the interface compatible with such screens. However,
we did not include such an interface in our timeline. Considering that we are just about on track with our timeline
but that we're all feeling the pressure of time, we decided that this interface will be implemented after we have a 
MVP if time permits.

