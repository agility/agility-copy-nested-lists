import agility from "@agility/content-fetch";

import mgmtApi from "@agility/management-sdk";

import fs from 'fs';


let file = 'config.json';

const configurations = JSON.parse(fs.readFileSync(file , "utf-8"));

const guid = configurations.guid;
const apiKeyFetch = configurations.apiKeyFetch;
const apiKeyPreview = configurations.apiKeyPreview;
const mgmtApiToken = configurations.mgmtApiToken;
const locale = configurations.locale;
const sourceReferenceName = configurations.sourceReferenceName;
const targetReferenceName = configurations.targetReferenceName;
const fieldName = configurations.fieldName;
const fieldToBeUpdated = configurations.fieldToBeUpdated;

const api = agility.getApi({
	guid: guid,
	apiKey: apiKeyFetch,
})

const contentList = await api.getContentList( {referenceName: sourceReferenceName,
        locale: locale,
         take: 50,
         skip: 0});

let contentItems = [];


let options = new mgmtApi.Options();
options.token = mgmtApiToken;

let apiClient = new mgmtApi.ApiClient(options);

for(let i = 0; i < contentList.items.length; i++){
    let contentItem = await apiClient.contentMethods.getContentItem(contentList.items[i].contentID, guid, locale);

    contentItem.contentID = -1;
    contentItem.properties.referenceName = targetReferenceName;
    contentItems.push(contentItem);
}

for(let i = 0; i < contentItems.length; i++){
    let contentItem = contentItems[i];
    let refName = contentItem.fields[fieldName];
    if(refName !== undefined){
        const innerList = await api.getContentList( {referenceName: refName,
            locale: locale,
                take: 50,
                skip: 0});
        
        let innerContentItems = [];
        for(let j = 0; j < innerList.items.length; j++){
            let innerItem = innerList.items[j];
            innerContentItems.push(innerItem);
        }
        let createdContentItem = await apiClient.contentMethods.saveContentItem(contentItem, guid, locale);
    
        let item = await apiClient.contentMethods.getContentItem(createdContentItem, guid, locale);
    
        let createdRef = item.fields[fieldName];
    
        for(let k = 0; k < innerContentItems.length; k++){
    
            let linkedContent = innerContentItems[k];
    
            linkedContent.properties.referenceName = createdRef;
            linkedContent.contentID = -1;
            
            linkedContent.fields[fieldToBeUpdated] = `Changed Text ${k}`;
            
            await apiClient.contentMethods.saveContentItem(linkedContent, guid, locale);
        }
    }
    
}