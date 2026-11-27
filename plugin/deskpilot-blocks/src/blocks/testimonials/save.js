
import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const {
        heading,
        description,
        columns,
        testimonials,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'deskpilot-testimonials',
    });

    return (
        <section {...blockProps}>
            <div className="deskpilot-testimonials__header">
                <RichText.Content tagName="h2" value={heading} />
                <RichText.Content tagName="p" value={description} />
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

                        <RichText.Content
                            tagName="p"
                            className="deskpilot-testimonial-card__quote"
                            value={item.quote}
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
        </section>
    );
};

export default Save;
