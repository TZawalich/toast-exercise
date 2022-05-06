import React from 'react';
import { screen, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import App from './App';

test('renders header text', () => {
  render(<App />);

  const heading  = screen.getByRole('heading', { name: /toast exercise/i});
  expect(heading).toBeInTheDocument();
});


test('snackbar toast pops up', () => {
  render(<App />);
  const newSubmission  = screen.getByRole('button', { name: /new submission/i});

  fireEvent.click(newSubmission)
  expect(screen.getByRole('button', {name:/Like/i})).toBeVisible()
});

test('adds item to list', () => {
  render(<App />);
  const newSubmission  = screen.getByRole('button', { name: /new submission/i});
  fireEvent.click(newSubmission)

  const likeButton = screen.getByRole('button', {name:/Like/i});
  fireEvent.click(likeButton)

  const likedList = screen.getByRole('list', {name: /Liked List/i})
  expect(likedList).toBeInTheDocument();

  const likedItem = screen.getByRole('listitem', {name: /Liked Item/i})
  expect(likedItem).toBeInTheDocument();
});

