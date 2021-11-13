
import { render, screen, fireEvent, waitFor, prettyDOM } from '@testing-library/react';
import InputFieldFactory from "./InputFieldFactory";


describe('<InputFieldFactory />', () => {
  it('renders App form', () => {

  const register = jest.fn();
  const errors = {};
  const firstName =  "firstName";
  const firstNameData =  "first Name";
  const taxId = "taxId";
  const taxIdData = "1234";
  
    const { container } = 	render(
		  <>
      {InputFieldFactory(firstName, firstNameData, register, errors)}
      {InputFieldFactory(taxId, taxIdData, register, errors)}
      </>
    );

    console.log(prettyDOM(container));
		expect(screen.getByTestId(`label-${firstName}`)).toBeInTheDocument();
		expect(screen.getByTestId(`label-${taxId}`)).toBeInTheDocument();
	});

});

