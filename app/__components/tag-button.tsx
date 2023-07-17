interface Props {
	onClick?: () => void;
	backgroundColor: string;
	name: string;
	options?: {
		padding: number;
	};
}

function TagButton({
	backgroundColor,
	name,
	onClick,
	options = {
		padding: 5,
	},
}: Props) {
	const { padding } = options;
	return (
		<li
			onClick={onClick}
			style={{ backgroundColor, padding }}
			className={`${
				onClick ? 'cursor-pointer' : ''
			} inline-block rounded-sm font-rubik`}
		>
			<span className='opacity-70'>{name}</span>
		</li>
	);
}

export default TagButton;
