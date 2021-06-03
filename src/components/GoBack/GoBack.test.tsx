import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GoBack } from './GoBack';
import renderer from 'react-test-renderer';

describe('Go back link', () => {
  it('must render a link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <GoBack to="/test">Go back to main page</GoBack>
      </BrowserRouter>,
    );

    expect(getByText(/Go back to main page/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <GoBack to="/test">Go back to main page</GoBack>
        </BrowserRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
