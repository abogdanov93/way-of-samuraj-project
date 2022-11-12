

export const updateObjectInArray = (items: any, itemId: any, objectPropName: any, objectProps: any) => {

    return items.map((i: any) => {

        if (i[objectPropName] === itemId) {
            return {...i, ...objectProps}
        }
        return i
    })
}