import {render} from '@testing-library/react';
import {generateElement,returnRespectiveHtmlElement} from '../helpers/generateUiElements';


test('check generateElement function',()=>{
  let result,temp={id:'301',element:'button'};
  result = generateElement('button','301');
  expect(temp).toEqual(expect.objectContaining(result));
})

it('checks returnRespectiveHtmlElement function',()=>{
   let JsxElement = returnRespectiveHtmlElement('button');
   const { getByText } = render(JsxElement);
   const createdElement = getByText(/i'm button/i);
   expect(createdElement).toBeInTheDocument();
})