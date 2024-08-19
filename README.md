# Example Code on nested lists (not shared)
This is an example solution to copy nested lists and making changes into them. This solution may vary for different instances but this will give you a basic idea on how the copy will work.

## Components used in the solution

- Agility Content Fetch.
- Agility Management API SDK.

## High level logic for the solution
- Get the source list which has the linked content using the content fetch sdk.
- Get all the content items on that list using the management API
- Loop through all the content items and update the referenceName of the target list referenceName: ```contentItem.properties.referenceName = targetReferenceName;```
- Loop through all the content items to get the referenceName of the field which will be used to get a list of all the items inside that list.
- Create the content items in the target list.
- Again access the field to get the newly created referenceName inside the target list.
- Access the field that needs to be updated and change the value.
- Save the content item inside the target list.

## Setting up the config values
- guid: Provide the guid from your instance.
- apiKeyFetch: Provide the fetch api key.
- apiKeyPreview: Provide the preview api key.
- mgmtApiToken: Provide the management api token which can be accessed from https://mgmt.aglty.io/oauth/authorize
- locale: The locale in which the list exists.
- sourceReferenceName: The referenceName of the source list.
- targetReferenceName: The referenceName of the target list.
- fieldName: The name of the linked field where the referenceName is defined. This is from the source list.
- fieldToBeUpdated: The field name that needs to be updated.

Run the index.js file using command ```node index.js```



## Resources

### Agility CMS

- [Official site](https://agilitycms.com)
- [Documentation](https://help.agilitycms.com/hc/en-us)


### Community

- [Official Slack](https://join.slack.com/t/agilitycommunity/shared_invite/enQtNzI2NDc3MzU4Njc2LWI2OTNjZTI3ZGY1NWRiNTYzNmEyNmI0MGZlZTRkYzI3NmRjNzkxYmI5YTZjNTg2ZTk4NGUzNjg5NzY3OWViZGI)
- [Blog](https://agilitycms.com/resources/posts)
- [GitHub](https://github.com/agility)
- [Forums](https://help.agilitycms.com/hc/en-us/community/topics)
- [Facebook](https://www.facebook.com/AgilityCMS/)
- [X](https://x.com/AgilityCMS)

## Feedback and Questions

If you have feedback or questions about this starter, please use the [Github Issues](https://github.com/agility/agility-cms-management-cli/issues) on this repo, join our [Community Slack Channel](https://join.slack.com/t/agilitycommunity/shared_invite/enQtNzI2NDc3MzU4Njc2LWI2OTNjZTI3ZGY1NWRiNTYzNmEyNmI0MGZlZTRkYzI3NmRjNzkxYmI5YTZjNTg2ZTk4NGUzNjg5NzY3OWViZGI) or create a post on the [Agility Developer Community](https://help.agilitycms.com/hc/en-us/community/topics).