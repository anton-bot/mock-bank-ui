import { Button } from './Button';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

const SAMPLE_CALLBACK = () => console.log('test');

describe('Button', () => {
  it('contains text inside the button', () => {
    const { getByText } = render(<Button onClick={SAMPLE_CALLBACK}>Text on button</Button>);

    expect(getByText(/Text on button/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Button onClick={SAMPLE_CALLBACK} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
