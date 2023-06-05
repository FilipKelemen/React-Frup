//This dynamically aligns the delete button with the correct right margin
//half the margin of the difference is needed to align delete button
import {dividePixels, operateWithPixels} from '../../utils/stringManipulations'
import {OperationCallbacks} from '../../utils/models/stringManipulation'

//MODIFY THIS AND EVERYTHING SHOULD ALIGN
const WIDTH_OF_DELETE_BUTTON = {xs: '23px',sm:'25px', md: '25px', lg: '29px'}
const DIAMETERS_OF_QUANTITY_BUTTONS = {xs: '25.5px',sm:'29px', md: '31px', lg: '33px'}
const COMPENSATION = '8px'

export const QUANTITY_BUTTONS_STYLES = {width: DIAMETERS_OF_QUANTITY_BUTTONS, height: DIAMETERS_OF_QUANTITY_BUTTONS}

export const DELETE_ICON_STYLES = {
  fontSize: WIDTH_OF_DELETE_BUTTON
}

// this is needed as icon button size does not actually change after icon font size is changed
const RADIUS_COMPENSATION_AFTER_ICON_GROWTH = {
  xs: operateWithPixels(WIDTH_OF_DELETE_BUTTON.xs,COMPENSATION,OperationCallbacks.add)!,
  sm: operateWithPixels(WIDTH_OF_DELETE_BUTTON.xs,COMPENSATION,OperationCallbacks.add)!,
  md: operateWithPixels(WIDTH_OF_DELETE_BUTTON.md,COMPENSATION,OperationCallbacks.add)!,
  lg: operateWithPixels(WIDTH_OF_DELETE_BUTTON.lg,COMPENSATION,OperationCallbacks.add)!
}

//this is the formula: after compensating I get a width of the delete button by adding the fontsize plus the compensation
//after this I  have to fix the margin in conjunction to the width of the quantity button
//therefore after I get the full width of the delete button, I subtract the button element width from the
//quantity button width. After this I divide by 2 to place the icon in the middle and align nicely
//(this will usually result in negative pixels that go as a right margin)
export const DELETE_BUTTON_STYLES = {
  padding: '0px',
  width: RADIUS_COMPENSATION_AFTER_ICON_GROWTH,
  height: RADIUS_COMPENSATION_AFTER_ICON_GROWTH,
  marginRight: {
    xs: dividePixels(operateWithPixels(DIAMETERS_OF_QUANTITY_BUTTONS.xs,operateWithPixels(WIDTH_OF_DELETE_BUTTON.xs,COMPENSATION,OperationCallbacks.add)!,OperationCallbacks.subtract)!,2),
    sm: dividePixels(operateWithPixels(DIAMETERS_OF_QUANTITY_BUTTONS.sm,operateWithPixels(WIDTH_OF_DELETE_BUTTON.sm,COMPENSATION,OperationCallbacks.add)!,OperationCallbacks.subtract)!,2),
    md: dividePixels(operateWithPixels(DIAMETERS_OF_QUANTITY_BUTTONS.md,operateWithPixels(WIDTH_OF_DELETE_BUTTON.md,COMPENSATION,OperationCallbacks.add)!,OperationCallbacks.subtract)!,2),
    lg: dividePixels(operateWithPixels(DIAMETERS_OF_QUANTITY_BUTTONS.lg,operateWithPixels(WIDTH_OF_DELETE_BUTTON.lg,COMPENSATION,OperationCallbacks.add)!,OperationCallbacks.subtract)!,2)
  }
}