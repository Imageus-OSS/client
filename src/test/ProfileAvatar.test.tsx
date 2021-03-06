/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ProfileAvatar from '../components/ProfileAvatar';

type Avatar = {
  firstName: string;
  lastName: string;
  imgURL?: string;
};

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // Setup root element
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Teardown
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

it('renders profile avatar properly given data', () => {
  const avatar: Avatar = {
    firstName: 'Johnny',
    lastName: 'Appleseed',
    imgURL: undefined,
  };

  act(() => {
    render(<ProfileAvatar avatarData={avatar} />, container);
  });
  expect(container!.textContent).toBe('JA');

  act(() => {
    avatar.imgURL = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80';
    render(<ProfileAvatar avatarData={avatar} />, container);
  });
  expect(container!.querySelector('img')).toBeTruthy();
});
