import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import data from "./data/entityData.json";
import InputFieldFactory from "./InputFieldFactory/InputFieldFactory";

describe('<App />', () => {
  it('renders App form', () => {
		render(
		  <App/>
		);
		expect(screen.getByTestId('form')).toBeInTheDocument();
	});

  it('Form submits on clicking save', async() => {
    const handleSubmit = jest.fn();
    const onSubmit = jest.fn();
    const register = jest.fn();
    const errors = jest.fn();
   render(
      <section id="form" className="form-section">
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        {Object.keys(data).map((key, index) => {
          return (
            <div className="input-container" key={index}>
              {InputFieldFactory(key, data[key], register, errors)}
            </div>
          );
        })}
        <button type="submit">SAVE</button>
      </form>
      <br />
    </section>
		);

    const btnSave = screen.getByRole('button', { name: /SAVE/i });
    fireEvent.submit(btnSave);
    expect(handleSubmit).toHaveBeenCalled();
	});
});

