


export const gridStyling = (ind, images) => {
    if (images?.length == 1) {
        return 'col-span-6'
    } else if (images?.length == 2) {
        return 'col-span-3 '
    } else if (images?.length == 3) {
        if (ind == 0) {
            return 'col-span-3 row-span-2'
        } else {
            return 'col-span-3 row-span-1'
        }
    } else if (images?.length == 4) {
        return 'col-span-3 '
    } else if (images?.length == 5) {
        if (ind == 0 || ind == 1) {
            return 'col-span-3'
        } else {
            return 'col-span-2'
        }
    } else if (images?.length >= 6) {
        if (ind == 0) {
            return 'col-span-4 row-span-2'
        } else {
            return 'col-span-2'
        }
    }
}