import {render} from '@testing-library/svelte';
import {expect} from 'chai';
import App from './App.svelte';

describe('<App>', () => {
  it('Says Hello', () => {
    const {getByText} = render(App);
    const helloElement = getByText(/hello/i);
    expect(document.body.contains(helloElement));
  });
});
