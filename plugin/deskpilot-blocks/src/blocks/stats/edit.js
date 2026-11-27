
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

const Edit = ({ attributes, setAttributes }) => {
    const {
        heading,
        description,
        columns,
        stats,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'deskpilot-stats',
    });

    const updateStat = (index, key, value) => {
        const updatedStats = [...stats];

        updatedStats[index] = {
            ...updatedStats[index],
            [key]: value,
        };

        setAttributes({ stats: updatedStats });
    };

    const addStat = () => {
        setAttributes({
            stats: [
                ...stats,
                {
                    number: '100+',
                    label: 'New Statistic',
                },
            ],
        });
    };

    const removeStat = (index) => {
        setAttributes({
            stats: stats.filter((_, i) => i !== index),
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

                {stats.map((stat, index) => (
                    <PanelBody
                        key={index}
                        title={`${__('Statistic', 'deskpilot')} ${index + 1}`}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__('Number / Value', 'deskpilot')}
                            value={stat.number}
                            onChange={(value) => updateStat(index, 'number', value)}
                        />

                        <TextControl
                            label={__('Label', 'deskpilot')}
                            value={stat.label}
                            onChange={(value) => updateStat(index, 'label', value)}
                        />

                        <Button
                            variant="tertiary"
                            isDestructive
                            onClick={() => removeStat(index)}
                        >
                            {__('Remove statistic', 'deskpilot')}
                        </Button>
                    </PanelBody>
                ))}
            </InspectorControls>

            <section {...blockProps}>
                <div className="deskpilot-stats__header">
                    <RichText
                        tagName="h2"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter heading...', 'deskpilot')}
                    />

                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder={__('Enter description...', 'deskpilot')}
                    />
                </div>

                <div
                    className="deskpilot-stats__grid"
                    style={{
                        '--deskpilot-stat-columns': columns,
                    }}
                >
                    {stats.map((stat, index) => (
                        <article className="deskpilot-stat-card" key={index}>
                            <RichText
                                tagName="div"
                                className="deskpilot-stat-card__number"
                                value={stat.number}
                                onChange={(value) => updateStat(index, 'number', value)}
                                placeholder={__('Number...', 'deskpilot')}
                            />

                            <RichText
                                tagName="p"
                                className="deskpilot-stat-card__label"
                                value={stat.label}
                                onChange={(value) => updateStat(index, 'label', value)}
                                placeholder={__('Label...', 'deskpilot')}
                            />
                        </article>
                    ))}
                </div>

                <div className="deskpilot-stats__actions">
                    <Button variant="primary" onClick={addStat}>
                        {__('+ Add Statistic', 'deskpilot')}
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Edit;
