import React from 'react';
import Form, { Input } from 'react-formable';

export const title = 'Basic';
export const link = 'basic';

export const markdown = `
This is the basic example.

- Pretty cool right?
- Nope? Thats ok to I guess

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

	export const code = <div>
		<h4>Hello!</h4>
	</div>;
`;

export const code = function () {
    return <Form>
		<Input />
    </Form>;
};
