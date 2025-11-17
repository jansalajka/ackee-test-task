import Link from 'next/link';

import { ArrowLeftIcon, PlusIcon } from '../../../Atoms';
import { colors, HeaderHoverColorEnum } from '../../../constants';
import { Header } from '../../Header';

export interface RecipePageHeaderProps {
    homeHref: string;
    newRecipeHref: string;
}

/**
 * Header component for recipe pages with home and new recipe links
 *
 * @param homeHref - URL for the home link (left arrow icon)
 * @param newRecipeHref - URL for the new recipe link (plus icon)
 * @returns Recipe page header element
 */
export function RecipePageHeader({ homeHref, newRecipeHref }: RecipePageHeaderProps): JSX.Element {
    return (
        <Header
            headline=''
            left={
                <Link href={homeHref}>
                    <ArrowLeftIcon color={colors.blue} />
                </Link>
            }
            right={
                <Link href={newRecipeHref}>
                    <PlusIcon color={colors.blue} />
                </Link>
            }
            hoverColor={HeaderHoverColorEnum.BLUE}
        />
    );
}
