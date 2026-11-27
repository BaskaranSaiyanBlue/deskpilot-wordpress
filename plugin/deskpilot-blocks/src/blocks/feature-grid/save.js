
import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const {
        heading = '',
        description = '',
        columns = 3,
        features = [],
    } = attributes;

    const safeFeatures = Array.isArray(features)
        ? features.map((feature) => ({
            icon: feature?.icon ?? '✦',
            title: feature?.title ?? '',
            description: feature?.description ?? '',
        }))
        : [];

    const blockProps = useBlockProps.save({
        className: 'deskpilot-feature-grid',
    });

    return (
        <section {...blockProps}>
            <div className="deskpilot-feature-grid__header">
                <RichText.Content tagName="h2" value={heading} />
                <RichText.Content tagName="p" value={description} />
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

                        <RichText.Content tagName="h3" value={feature.title} />
                        <RichText.Content tagName="p" value={feature.description} />
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Save;
