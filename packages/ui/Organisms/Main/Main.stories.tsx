import type { Meta, StoryObj } from '@storybook/nextjs';
import { Main } from './Main';

const meta = {
    title: 'UI/Organisms/Main',
    component: Main,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
    args: {
        children: (
            <div style={{ padding: '20px' }}>
                <h1>Main Content</h1>
                <p>This is the main content area with max-width and centered layout.</p>
            </div>
        ),
    },
};

export const WithMultipleChildren: Story = {
    args: {
        children: (
            <>
                <div style={{ padding: '20px' }}>
                    <h2>Section 1</h2>
                    <p>First section content</p>
                </div>
                <div style={{ padding: '20px' }}>
                    <h2>Section 2</h2>
                    <p>Second section content</p>
                </div>
            </>
        ),
    },
};

