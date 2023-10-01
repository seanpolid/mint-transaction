import { actionType } from '../enums';
import { useState } from 'react';

const useObject = (initialState) => {
    const [object, setObject] = useState(initialState);

    const updateObject = (attributeName, value) => {
        setObject(object => {
            const objectClone = cloneObject(object);
            objectClone.id = object.id;
            objectClone[attributeName] = value;
            return objectClone;
        })
    } 

    return [object, setObject, updateObject];
}

const useList = (initialState, constructor) => {
    const [list, setList] = useState(initialState);

    const updateListItem = (attributeName, value, key) => {
        setList((list) => {
            const item = list.filter(item => item.key === key)[0];
            const itemToUpdate = cloneObject(item);
            itemToUpdate[attributeName] = value;
            return list.filter(item => item.key !== key).concat([itemToUpdate]);
        });
    }

    const updateList = (actionsToPerform) => {
        setList((list) => {
            const actions = {
                [actionType.ADD]: (currentList) => {
                    return currentList.concat(new constructor());
                },
                [actionType.DELETE]: (currentList, index) => {
                    return currentList.toSpliced(index, 1);
                },
                [actionType.APPLY]: (currentList, functionToApply) => {
                    return functionToApply(currentList);
                }
            }

            let prevActionResult = null;
            const actionsToPerformLength = actionsToPerform.length;
            for (let i = 0; i < actionsToPerformLength; i++) {
                const actionToPerform = actionsToPerform[i];

                if (i === actionsToPerformLength - 1) {
                    if (i == 0) {
                        return actions[actionToPerform.action](list, actionToPerform.arg);
                    } else {
                        return actions[actionToPerform.action](prevActionResult, actionToPerform.arg);
                    }
                } else {
                    if (i === 0) {
                        prevActionResult = actions[actionToPerform.action](list, actionToPerform.arg);
                    } else {
                        prevActionResult = actions[actionToPerform.action](prevActionResult, actionToPerform.arg);
                    }
                }
            }
        })
    }

    return [list, setList, updateListItem, updateList];
}

const cloneObject = (objectToClone) => {
    const objectClone = objectToClone.clone();
    return updateObjectsIds(objectClone, objectToClone);   
}

const updateObjectsIds = (objectClone, objectToClone) => {
    objectClone.id = objectToClone.id;
    Object.entries(objectClone).forEach(entry => {
        const [attributeName, value] = entry;
        if (value instanceof Array) {
            const arrayLength = value.length;
            for (let i = 0; i < arrayLength; i++) {
                objectClone[attributeName][i] = updateObjectsIds(objectClone[attributeName][i], objectToClone[attributeName][i]);
            }
        }
    })
    return objectClone;
}

export { useObject, useList }