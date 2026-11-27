
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    TextControl,
    Button,
    SelectControl,
} from '@wordpress/components';

const ICON_OPTIONS = [
    { label: 'Sparkle', value: '✦' },
    { label: 'Lightning', value: '⚡' },
    { label: 'Diamond', value: '◈' },
    { label: 'Star', value: '★' },
    { label: 'Heart', value: '♥' },
    { label: 'Check', value: '✓' },
    { label: 'Message', value: '💬' },
    { label: 'Rocket', value: '🚀' },
];

const DEFAULT_FEATURES = [
    {
        icon: '✦',
        title: 'Smart Ticket Management',
        description: 'Manage customer requests efficiently.',
    },
    {
        icon: '⚡',
        title: 'Fast Responses',
        description: 'Help your team respond faster.',
    },
    {
        icon: '◈',
        title: 'Team Collaboration',
        description: 'Keep everyone working together.',
    },
];

const Edit = ({ attributes, setAttributes }) => {
    const {
        heading = 'Everything Your Support Team Needs',
        description = 'Powerful tools to simplify customer support.',
        columns = 3,
        features = DEFAULT_FEATURES,
    } = attributes;

    const safeFeatures = Array.isArray(features)
        ? features.map((feature) => ({
            icon: feature?.icon ?? '✦',
            title: feature?.title ?? '',
            description: feature?.description ?? '',
        }))
        : DEFAULT_FEATURES;

    const blockProps = useBlockProps({
        className: 'deskpilot-feature-grid',
    });

    const updateFeature = (index, key, value) => {
        const updated = [...safeFeatures];
        updated[index] = { ...updated[index], [key]: value };
        setAttributes({ features: updated });
    };

    const addFeature = () => {
        setAttributes({
            features: [
                ...safeFeatures,
                {
                    icon: '✦',
                    title: 'New Feature',
                    description: 'Describe your feature here.',
                },
            ],
        });
    };

    const removeFeature = (index) => {
        setAttributes({
            features: safeFeatures.filter((_, i) => i !== index),
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Section Settings', 'deskpilot')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('Section heading', 'deskpilot')}
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                    />

                    <TextControl
                        label={__('Section description', 'deskpilot')}
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                    />

                    <RangeControl
                        label={__('Columns', 'deskpilot')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={2}
                        max={4}
                    />
                </PanelBody>

                {safeFeatures.map((feature, index) => (
                    <PanelBody
                        key={index}
                        title={`${__('Feature', 'deskpilot')} ${index + 1}`}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Icon', 'deskpilot')}
                            value={feature.icon}
                            options={ICON_OPTIONS}
                            onChange={(value) => updateFeature(index, 'icon', value)}
                        />

                        <TextControl
                            label={__('Feature title', 'deskpilot')}
                            value={feature.title}
                            onChange={(value) => updateFeature(index, 'title', value)}
                        />

                        <TextControl
                            label={__('Feature description', 'deskpilot')}
                            value={feature.description}
                            onChange={(value) => updateFeature(index, 'description', value)}
                        />

                        <Button
                            variant="tertiary"
                            isDestructive
                            onClick={() => removeFeature(index)}
                        >
                            {__('Remove feature', 'deskpilot')}
                        </Button>
                    </PanelBody>
                ))}
            </InspectorControls>

            <section {...blockProps}>
                <div className="deskpilot-feature-grid__header">
                    <RichText
                        tagName="h2"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter section heading...', 'deskpilot')}
                    />

                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder={__('Enter section description...', 'deskpilot')}
                    />
                </div>

                <div
                    className="deskpilot-feature-grid__items"
                    style={{ '--deskpilot-columns': columns }}
                >
                    {safeFeatures.map((feature, index) => (
                        <article className="deskpilot-feature-card" key={index}>
                            <div className="deskpilot-feature-card__icon">
                                {feature.icon}
                            </div>

                            <RichText
                                tagName="h3"
                                value={feature.title}
                                onChange={(value) => updateFeature(index, 'title', value)}
                                placeholder={__('Feature title...', 'deskpilot')}
                            />

                            <RichText
                                tagName="p"
                                value={feature.description}
                                onChange={(value) => updateFeature(index, 'description', value)}
                                placeholder={__('Feature description...', 'deskpilot')}
                            />
                        </article>
                    ))}
                </div>

                <div className="deskpilot-feature-grid__actions">
                    <Button variant="primary" onClick={addFeature}>
                        {__('+ Add Feature', 'deskpilot')}
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Edit;
