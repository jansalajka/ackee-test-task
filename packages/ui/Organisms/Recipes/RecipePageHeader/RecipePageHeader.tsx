import Link from 'next/link';

import { colors, HeaderHoverColorEnum } from '../../../constants';
import { ArrowLeftIcon, PlusIcon } from '../../../Atoms/Icons';
import { Header } from '../../Header';

export interface RecipePageHeaderProps {
    homeHref: string;
    newRecipeHref: string;
}

export function RecipePageHeader({ homeHref, newRecipeHref }: RecipePageHeaderProps) {
    return (
        <Header
            headline=""
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

