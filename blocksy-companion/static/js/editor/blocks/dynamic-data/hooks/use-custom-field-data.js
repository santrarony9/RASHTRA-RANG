import { useMemo, useState, useEffect } from '@wordpress/element'

import { getStableJsonKey } from '@creative-themes/wordpress-helpers/get-stable-json-key'
import cachedFetch from '@creative-themes/wordpress-helpers/cached-fetch'

// TODO: maybe rename this hook to show that it can be used for something else
// other than custom fields.
//
// Potentially, termId can also be provided to get term data.
const useCustomFieldData = ({
	fieldsContext,
	fieldDescriptor,
	before = '',
	after = ''
}) => {
	const [fieldData, setFieldData] = useState({})
	const [lastCacheKey, setLastCacheKey] = useState(null)

	const { type, post_type, post_id } = fieldsContext
	const { provider, id, attributes, ...rest } = fieldDescriptor

	const requestDescriptor = useMemo(() => {
		const url = `${wp.ajax.settings.url}?action=blocksy_dynamic_data_block_custom_field_data`

		const body = {
			context: { type, post_type, post_id },

			field_provider: provider,
			field_id: id,

			// optional attributes
			attributes,

			before,
			after
		}

		return {
			url,
			body,
			cacheKey: getStableJsonKey({ ...body, url })
		}
	}, [type, post_type, post_id, provider, id, attributes, before, after])

	useEffect(() => {
		cachedFetch(requestDescriptor.url, requestDescriptor.body)
			.then((response) => response.json())
			.then(({ success, data }) => {
				if (!success) {
					return
				}

				setFieldData((prev) => ({
					...prev,
					[requestDescriptor.cacheKey]: data.field_data
				}))

				setLastCacheKey(requestDescriptor.cacheKey)
			})
	}, [requestDescriptor])

	let fieldDataResult = null

	let resultCacheKey = requestDescriptor.cacheKey

	if (!(resultCacheKey in fieldData)) {
		resultCacheKey = lastCacheKey
	}

	if (resultCacheKey && resultCacheKey in fieldData) {
		fieldDataResult = fieldData[resultCacheKey]
	}

	return {
		fieldData: fieldDataResult
	}
}

export default useCustomFieldData
