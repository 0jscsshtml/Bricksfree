
https://github.com/0jscsshtml/Bricksfree/assets/80338568/2aa5402f-27a2-4cdd-95f0-d41b25610a35


https://github.com/0jscsshtml/Bricksfree/assets/80338568/bfd39242-fee3-47c9-af7a-83263cbfa2a6



# Extra Controls on Default Form Element

* New Options group
  * Enable Multi Steps Form
  * Enable Step Form Progress
  * Enable Password Visibility (Form wide)
  * Enable DatePicker Monday as First Week Day (Form wide)
  * Enable DatePicker Options (per field)
  * Enable Field Label:Value as url parameters
  * Enable Frontend Form

# Multi-steps Form
  * Enable in Options group
  * New control in all form fields except hidden field for step group.
  * Step group control default to group 1.
  * Bricks filter hook auto insert Prev/Next buttons inside form submit wrapper. (Visible in frontend only).
  * Auto assign basic styling for Prev/Next buttons at Form customCSS. Make changes here if you feel deem fit.
  * Disable in Options group, auto remove customCSS styling for Prev/Next buttons at Form customCSS.
  * Auto assign captcha and submit fields to last group.
  * Html5 validation.

# Multi-steps Form Progress
  * Enable in Options group
  * Auto create progress components base on total step groups assign in form fields. Components using Block, and 2 List elements with some basic class, attribute and styling. Adjust as usual as other elements.
  * Disable in Options group auto delete progress component.

#  Password Visibility
  * Enable in Options group.
  * Apply to all form password fields.
  * Assign Show/Hide Icon Url.
  * Bricks filter hook auto insert visibility toggle buttons inside form password field wrapper. (Visible in frontend only).
  * Auto assign basic styling for visibility toggle buttons at Form customCSS. Make changes here if you feel deem fit.
  * Disable in Options group auto delete styling for visibility toggle buttons at Form customCSS.

# Datepicker
 * Enable Monday as First Week Day at Options group, apply on all datepicker fields.
 * Enable datepicker options at Options group, extra flatpicker control on datepicker fields.
   * Disable calendar.
   * Today as start date, Custom start date and end date, limit dates range for selection.
   * Start date base on another datepicker field selected date.
   * Disable on weekend, custom disable dates in multiple or range.
   * Set default hour and minutes.

# Redirect with field label:value as url parameters
  * Enable in Options group.
  * Extra control on certain form fields type to attach as url parameters.
  * Auto assign custom actions and remove Bricks default redirect action, use the custom redirect action instead.
  * Toggle off in Options group auto remove custom actions.
