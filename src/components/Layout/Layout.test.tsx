import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Layout } from './Layout';

it('matches snapshot', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Layout>Sample text</Layout>
      </BrowserRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
