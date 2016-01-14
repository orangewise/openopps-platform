# Save as Draft


Task creator view:
- User selects "Save draft"
- User stays on editing page.
- User receives notice stating that the draft has been saved.
- Edit page:
    - for new documents and drafts: includes "Save draft" and "Submit for review" button.
    - for opportunities in any other state: only have a "Save" button
- Edit Opportunity State
  -  needs to include "Submitted"
  -  you can't go from Submitted to Draft from the Edit Opportunity State dialog, because a draft might have validation errors, so we tell people that need to Edit the Opportunity and submit it
- Notification:
  - changing state to "Submitted" should trigger current notification
  - saving as draft for the first time, generates a one time email with a link to the draft -- based on the creation date and the updated date matching  (people really use the email notifications to find direct links to their tasks and as reminders about next steps)

User Profile:
- Drafts are listed along with open Opportunities in the task creator's profile, if a draft has not title, it is listed as "Untitled Draft"


Admin view:
- Current "Draft" is renamed to "Submitted"
- New *actual* "Draft" tab is in the far right
