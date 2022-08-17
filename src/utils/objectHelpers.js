export const updateObjectInArray = (items, itemId, objectPropName, objectProps) => {
   return items.map(i => {
        if (i[objectPropName] === itemId) {
            return {...i, ...objectProps}
        }
        return i;
    })
}