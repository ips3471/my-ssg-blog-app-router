import TagType from '../__interfaces/tag';

interface Props {
	onClick?: () => void;
	tag: TagType;
	options?: {
		padding: number;
	};
}

function TagButton({
	tag,
	onClick,
	options = {
		padding: 5,
	},
}: Props) {
	const { padding } = options;
	return (
		<li
			onClick={onClick}
			style={{ backgroundColor: tag.color, padding }}
			className={`${
				onClick ? 'cursor-pointer' : ''
			} inline-block rounded-sm font-rubik`}
		>
			<span className='opacity-70'>{tag.name}</span>
		</li>
	);
}

export default TagButton;
