
import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const {
        heading,
        description,
        columns,
        stats,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'deskpilot-stats',
    });

    return (
        <section {...blockProps}>
            <div className="deskpilot-stats__header">
                <RichText.Content tagName="h2" value={heading} />
                <RichText.Content tagName="p" value={description} />
            </div>

            <div
                className="deskpilot-stats__grid"
                style={{
                    '--deskpilot-stat-columns': columns,
                }}
            >
                {stats.map((stat, index) => (
                    <article className="deskpilot-stat-card" key={index}>
                        <RichText.Content
                            tagName="div"
                            className="deskpilot-stat-card__number"
                            value={stat.number}
                        />

                        <RichText.Content
                            tagName="p"
                            className="deskpilot-stat-card__label"
                            value={stat.label}
                        />
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Save;
