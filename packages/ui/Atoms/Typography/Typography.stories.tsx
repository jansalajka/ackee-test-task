import type { Meta, StoryObj } from '@storybook/nextjs';
import { useFela } from 'react-fela';
import { colors } from '../../constants';
import { typographyStyles } from '../../styles';

const TypographyShowcase = () => {
    const { css } = useFela();

    const containerStyles = {
        maxWidth: '800px',
        margin: '0 auto',
    };

    const sectionStyles = {
        marginBottom: '48px',
    };

    const sectionTitleStyles = {
        fontSize: '18px',
        fontWeight: 700,
        color: colors.blue,
        marginBottom: '24px',
        textTransform: 'uppercase',
        borderBottom: `2px solid ${colors.gray.light}`,
        paddingBottom: '8px',
    };

    const exampleStyles = {
        marginBottom: '16px',
    };

    const labelStyles = {
        fontSize: '12px',
        color: colors.gray.medium,
        marginBottom: '4px',
        fontFamily: 'monospace',
    };

    const backgroundWrapperStyles = {
        backgroundColor: colors.blue,
        padding: '16px',
        borderRadius: '4px',
    };

    const backgroundWrapperPinkStyles = {
        backgroundColor: colors.pink,
        padding: '16px',
        borderRadius: '4px',
    };

    const buttonWrapperStyles = {
        padding: '8px 16px',
        border: `2px solid ${colors.pink}`,
        borderRadius: '12px',
        backgroundColor: colors.white,
        cursor: 'pointer',
    };

    const iconButtonWrapperStyles = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
    };

    const inputWrapperStyles = {
        width: '100%',
        border: 'none',
        borderBottom: `1px solid ${colors.gray.light}`,
        padding: '0 0 9px 0',
        backgroundColor: 'transparent',
        outline: 'none',
    };

    const labelContainerStyles = {
        position: 'relative',
        paddingTop: '24px',
    };

    const labelNormalStyles = {
        position: 'absolute',
        left: 0,
        top: '24px',
    };

    const labelFocusedStyles = {
        position: 'absolute',
        left: 0,
        top: 0,
    };

    return (
        <div className={css(containerStyles)}>
            <div className={css(sectionStyles)}>
                <h2 className={css(sectionTitleStyles)}>Headings</h2>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Recipe Title - 32px / 700 / line-height: 1.4 / white</div>
                    <div className={css(backgroundWrapperStyles)}>
                        <h1 className={css(typographyStyles.recipeTitle)}>Recipe Title Heading</h1>
                    </div>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Section Heading - 18px / 700 / uppercase / blue</div>
                    <h3 className={css(typographyStyles.sectionHeading)}>Section Heading</h3>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Header Headline - 24px / 600 / line-height: 1.4</div>
                    <h4 className={css(typographyStyles.headerHeadline)}>Header Headline</h4>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Recipe Item Name - 18px / 700 / line-height: 1.4 / blue</div>
                    <p className={css(typographyStyles.recipeItemName)}>Recipe Item Name</p>
                </div>
            </div>

            <div className={css(sectionStyles)}>
                <h2 className={css(sectionTitleStyles)}>Body Text</h2>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Intro Text - 18px / 400 / line-height: 1.6</div>
                    <p className={css(typographyStyles.introText)}>
                        This is the intro text style used for recipe descriptions. It provides a larger, more readable format
                        for important content that introduces the recipe to the user.
                    </p>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Body Text - 16px / 400 / line-height: 1.6</div>
                    <p className={css(typographyStyles.bodyText)}>
                        This is the standard body text used throughout the application. It's used for ingredient lists,
                        preparation steps, and general content. The line height ensures comfortable reading.
                    </p>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Rating Time - 20px / 400 / line-height: 1.4 / white</div>
                    <div className={css(backgroundWrapperPinkStyles)}>
                        <p className={css(typographyStyles.ratingTime)}>30 min.</p>
                    </div>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Rating Section Title - 20px / 700 / white</div>
                    <div className={css(backgroundWrapperStyles)}>
                        <p className={css(typographyStyles.ratingSectionTitle)}>Ohodnoť tento recept</p>
                    </div>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Error Title - 20px / 700 / pink</div>
                    <p className={css(typographyStyles.errorTitle)}>Chyba při načítání receptu</p>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Rate Recipe Title - 20px / 700</div>
                    <p className={css(typographyStyles.rateRecipeTitle)}>Ohodnoť tento recept</p>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Rate Recipe Subtitle - 14px / 400</div>
                    <p className={css(typographyStyles.rateRecipeSubtitle)}>Vyberte počet hvězdiček</p>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Recipe Item Time - 14px / 400</div>
                    <p className={css(typographyStyles.recipeItemTime)}>30 min.</p>
                </div>
            </div>

            <div className={css(sectionStyles)}>
                <h2 className={css(sectionTitleStyles)}>Buttons & Form Elements</h2>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Button Text - 14px / 700 / pink</div>
                    <button className={css(buttonWrapperStyles)}>
                        <span className={css(typographyStyles.buttonText)}>Add Ingredient</span>
                    </button>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Icon Button Text - 20px / 400 / blue</div>
                    <button className={css(iconButtonWrapperStyles)}>
                        <span className={css(typographyStyles.iconButtonText)}>←</span>
                    </button>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Input Text - 16px / 400</div>
                    <input type="text" placeholder="Recipe name" className={css([inputWrapperStyles, typographyStyles.inputText])} />
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Input Label (Normal) - 16px / 400 / gray.medium</div>
                    <div className={css(labelContainerStyles)}>
                        <label className={css([labelNormalStyles, typographyStyles.inputLabel])}>Recipe Name</label>
                    </div>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Input Label (Focused) - 14px / 400 / blue</div>
                    <div className={css(labelContainerStyles)}>
                        <label className={css([labelFocusedStyles, typographyStyles.inputLabelFocused])}>Recipe Name</label>
                    </div>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Form Section Header - 14px / 700 / uppercase / blue</div>
                    <p className={css(typographyStyles.formSectionHeader)}>Recipe Information</p>
                </div>

                <div className={css(exampleStyles)}>
                    <div className={css(labelStyles)}>Error Message - 14px / 400 / pink</div>
                    <p className={css(typographyStyles.errorMessage)}>Toto pole je povinné</p>
                </div>
            </div>
        </div>
    );
};

const meta = {
    title: 'UI/Atoms/Typography',
    component: TypographyShowcase,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TypographyShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <TypographyShowcase />,
};
