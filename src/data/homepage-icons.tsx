import { Award, BookOpen, Heart, Target } from 'lucide-react';

export const ProjectIcons = {
    award: () => <Award className="w-6 h-6" />,
    bookOpen: () => <BookOpen className="w-6 h-6" />,
    heart: () => <Heart className="w-6 h-6" />,
    target: () => <Target className="w-6 h-6" />,
};

export type ProjectIconKey = keyof typeof ProjectIcons;