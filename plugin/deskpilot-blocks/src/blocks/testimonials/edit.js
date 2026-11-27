
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
    TextareaControl,
    Button,
    SelectControl,
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const {
        heading,
        description,
        columns,
        testimonials,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'deskpilot-testimonials',
    });

    const updateTestimonial = (index, key, value) => {
        const updated = [...testimonials];

        updated[index] = {
            ...updated[index],
            [key]: value,
        };

        setAttributes({ testimonials: updated });
    };

    const addTestimonial = () => {
        setAttributes({
            testimonials: [
                ...testimonials,
                {
                    quote: 'Share your customer experience here.',
                    name: 'New Customer',
                    role: 'Customer Role',
                    rating: 5,
                    initials: 'NC',
                },
            ],
        });
    };

    const removeTestimonial = (index) => {
        setAttributes({
            testimonials: testimonials.filter((_, i) => i !== index),
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
                        min={1}
                        max={3}
                    />
                </PanelBody>

                {testimonials.map((item, index) => (
                    <PanelBody
                        key={index}
                        title={`${__('Testimonial', 'deskpilot')} ${index + 1}`}
                        initialOpen={false}
                    >
                        <TextareaControl
                            label={__('Testimonial quote', 'deskpilot')}
                            value={item.quote}
                            onChange={(value) => updateTestimonial(index, 'quote', value)}
                        />

                        <TextControl
                            label={__('Customer name', 'deskpilot')}
                            value={item.name}
                            onChange={(value) => updateTestimonial(index, 'name', value)}
                        />

                        <TextControl
                            label={__('Job title', 'deskpilot')}
                            value={item.role}
                            onChange={(value) => updateTestimonial(index, 'role', value)}
                        />

                        <TextControl
                            label={__('Avatar initials', 'deskpilot')}
                            value={item.initials}
                            onChange={(value) => updateTestimonial(index, 'initials', value)}
                        />

                        <SelectControl
                            label={__('Star rating', 'deskpilot')}
                            value={item.rating}
                            options={[
                                { label: '5 Stars', value: 5 },
                                { label: '4 Stars', value: 4 },
                                { label: '3 Stars', value: 3 },
                                { label: '2 Stars', value: 2 },
                                { label: '1 Star', value: 1 },
                            ]}
                            onChange={(value) => updateTestimonial(index, 'rating', Number(value))}
                        />

                        <Button
                            variant="tertiary"
                            isDestructive
                            onClick={() => removeTestimonial(index)}
                        >
                            {__('Remove testimonial', 'deskpilot')}
                        </Button>
                    </PanelBody>
                ))}
            </InspectorControls>

            <section {...blockProps}>
                <div className="deskpilot-testimonials__header">
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
                    className="deskpilot-testimonials__grid"
                    style={{
                        '--deskpilot-testimonial-columns': columns,
                    }}
                >
                    {testimonials.map((item, index) => (
                        <article className="deskpilot-testimonial-card" key={index}>
                            <div className="deskpilot-testimonial-card__stars">
                                {'★'.repeat(item.rating)}
                                <span>{'☆'.repeat(5 - item.rating)}</span>
                            </div>

                            <RichText
                                tagName="p"
                                className="deskpilot-testimonial-card__quote"
                                value={item.quote}
                                onChange={(value) => updateTestimonial(index, 'quote', value)}
                                placeholder={__('Enter testimonial...', 'deskpilot')}
                            />

                            <div className="deskpilot-testimonial-card__author">
                                <div className="deskpilot-testimonial-card__avatar">
                                    {item.initials}
                                </div>

                                <div>
                                    <strong>{item.name}</strong>
                                    <span>{item.role}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="deskpilot-testimonials__actions">
                    <Button variant="primary" onClick={addTestimonial}>
                        {__('+ Add Testimonial', 'deskpilot')}
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Edit;
