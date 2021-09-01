import { FC, ReactNode } from "react";

const validateFlag = (data: string | boolean) => {
	if (data === true || data === 'true')
		return data;

	return '';
}

const PremiumFeatures: FC = ({ children }: { children: ReactNode }) => {
	const validatedFlag: string | boolean = validateFlag(process.env.NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES);

	return validatedFlag
		? (<>{children}</>)
		: (<></>)
}

export default PremiumFeatures;