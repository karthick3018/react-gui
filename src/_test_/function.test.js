import {render} from '@testing-library/react';
import {generateElement,returnRespectiveHtmlElement} from '../helpers/generateUiElements';


test('check generateElement function',()=>{
  let result,temp={id:'3',element:'button'};
  result = generateElement('button','3');
  expect(temp).toEqual(expect.objectContaining(result));
})

test('check returnRespectiveHtmlElement function',()=>{
   let JsxElement = returnRespectiveHtmlElement('button');
   const { getByText } = render(JsxElement);
   const createdElement = getByText(/i'm button/i);
   expect(createdElement).toBeInTheDocument();
})