
import { useBlockProps } from '@wordpress/block-editor';

const normalizePlans = (plans) => {
    const source = Array.isArray(plans) ? plans : [];

    return source.map((plan = {}) => ({
        name: plan.name ?? 'New Plan',
        price: plan.price ?? '29',
        period: plan.period ?? 'month',
        description: plan.description ?? '',
        features: Array.isArray(plan.features) ? plan.features : [],
        buttonText: plan.buttonText ?? 'Get Started',
        buttonUrl: plan.buttonUrl ?? '#',
        popular: Boolean(plan.popular),
    }));
};

const Save = ({ attributes }) => {
    const heading = attributes.heading ?? '';
    const description = attributes.description ?? '';
    const pricingPlans = normalizePlans(attributes.plans);

    const blockProps = useBlockProps.save({
        className: 'deskpilot-pricing',
    });

    return (
        <section {...blockProps}>
            <div className="deskpilot-pricing__header">
                <h2>{heading}</h2>
                <p>{description}</p>
            </div>

            <div className="deskpilot-pricing__grid">
                {pricingPlans.map((plan, index) => (
                    <article
                        className={`deskpilot-pricing-card ${plan.popular ? 'is-popular' : ''}`}
                        key={index}
                    >
                        {plan.popular && (
                            <div className="deskpilot-pricing-card__badge">
                                Most Popular
                            </div>
                        )}

                        <h3>{plan.name}</h3>

                        <p className="deskpilot-pricing-card__description">
                            {plan.description}
                        </p>

                        <div className="deskpilot-pricing-card__price">
                            <span>$</span>
                            {plan.price}
                            <small>/{plan.period}</small>
                        </div>

                        <ul>
                            {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex}>
                                    <span>✓</span> {feature}
                                </li>
                            ))}
                        </ul>

                        <a
                            className="deskpilot-pricing-card__button"
                            href={plan.buttonUrl}
                        >
                            {plan.buttonText}
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Save;
