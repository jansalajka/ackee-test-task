import type { Meta, StoryObj } from '@storybook/nextjs';
import { useFela } from 'react-fela';

import { colors } from '../../constants';
import { colorUtils, hexToRgba } from '../../utils';

const meta = {
    title: 'UI/Atoms/Colors',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const colorSwatchStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
};

const swatchStyles = {
    border: `1px solid ${colors.gray.light}`,
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: colors.white,
};

const colorBoxStyles = (color: string) => ({
    width: '100%',
    height: '120px',
    backgroundColor: color,
    borderBottom: `1px solid ${colors.gray.light}`,
});

const colorInfoStyles = {
    padding: '16px',
};

const colorNameStyles = {
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: '4px',
    color: colors.gray.dark,
};

const colorValueStyles = {
    fontSize: '12px',
    color: colors.gray.medium,
    fontFamily: 'monospace',
};

function ColorSwatch({ name, value }: { name: string; value: string }) {
    const { css } = useFela();

    return (
        <div className={css(swatchStyles)}>
            <div className={css(colorBoxStyles(value))} />
            <div className={css(colorInfoStyles)}>
                <div className={css(colorNameStyles)}>{name}</div>
                <div className={css(colorValueStyles)}>{value}</div>
            </div>
        </div>
    );
}

const AllColorsRender = () => {
    const { css } = useFela();

    return (
        <div>
            <h2 style={{ marginBottom: '24px' }}>Primary Colors</h2>
            <div className={css(colorSwatchStyles)}>
                <ColorSwatch name="Blue" value={colors.blue} />
                <ColorSwatch name="Pink" value={colors.pink} />
                <ColorSwatch name="White" value={colors.white} />
            </div>

            <h2 style={{ marginBottom: '24px', marginTop: '32px' }}>Purple Variants</h2>
            <div className={css(colorSwatchStyles)}>
                <ColorSwatch name="Purple Light" value={colors.purple.light} />
                <ColorSwatch name="Purple Dark" value={colors.purple.dark} />
            </div>

            <h2 style={{ marginBottom: '24px', marginTop: '32px' }}>Gray Scale</h2>
            <div className={css(colorSwatchStyles)}>
                <ColorSwatch name="Gray Lighter" value={colors.gray.lighter} />
                <ColorSwatch name="Gray Light" value={colors.gray.light} />
                <ColorSwatch name="Gray Medium" value={colors.gray.medium} />
                <ColorSwatch name="Gray Dark" value={colors.gray.dark} />
            </div>

            <h2 style={{ marginBottom: '24px', marginTop: '32px' }}>Background</h2>
            <div className={css(colorSwatchStyles)}>
                <ColorSwatch name="Background" value={colors.background} />
            </div>

            <h2 style={{ marginBottom: '24px', marginTop: '32px' }}>Color Utilities</h2>
            <div className={css(colorSwatchStyles)}>
                <ColorSwatch name="Shadow" value={colorUtils.shadow} />
                <ColorSwatch name="Overlay" value={colorUtils.overlay} />
                <ColorSwatch name="Hover Background" value={colorUtils.hoverBackground} />
            </div>

            <h2 style={{ marginBottom: '24px', marginTop: '32px' }}>RGBA Examples</h2>
            <div className={css(colorSwatchStyles)}>
                <ColorSwatch name="Blue 50% Opacity" value={hexToRgba(colors.blue, 0.5)} />
                <ColorSwatch name="Pink 30% Opacity" value={hexToRgba(colors.pink, 0.3)} />
                <ColorSwatch name="Gray Dark 20% Opacity" value={hexToRgba(colors.gray.dark, 0.2)} />
            </div>
        </div>
    );
};

export const AllColors: Story = {
    render: AllColorsRender,
};

