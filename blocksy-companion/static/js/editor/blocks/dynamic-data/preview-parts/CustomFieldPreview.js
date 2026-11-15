import { createElement } from '@wordpress/element'
import useCustomFieldData from '../hooks/use-custom-field-data'

import CustomTextField from './custom/CustomTextField'
import CustomImageField from './custom/CustomImageField'

const CustomFieldPreview = ({
	fieldDescriptor,

	fieldsContext,

	attributes
}) => {
	let before = ''
	let after = ''

	if (fieldDescriptor.type !== 'image') {
		before = attributes.before
		after = attributes.after

		if (
			attributes.has_field_link === 'yes' &&
			attributes.has_field_link_wrap_content === 'no'
		) {
			before = `${before}<a href="#" rel="noopener noreferrer">`
			after = `</a>${after}`
		}
	}

	const { fieldData } = useCustomFieldData({
		fieldDescriptor,
		fieldsContext,
		before,
		after
	})

	if (fieldDescriptor.type === 'image') {
		return (
			<CustomImageField
				fieldData={fieldData}
				fieldDescriptor={fieldDescriptor}
				attributes={attributes}
			/>
		)
	}

	return (
		<CustomTextField
			fieldData={fieldData}
			fieldDescriptor={fieldDescriptor}
			attributes={attributes}
		/>
	)
}

export default CustomFieldPreview
