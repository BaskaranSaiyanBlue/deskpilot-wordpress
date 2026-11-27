
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    TextareaControl,
    Button,
    CheckboxControl,
} from '@wordpress/components';

const DEFAULT_PLANS = [
    {
        name: 'Starter',
        price: '19',
        period: 'month',
        description: 'Perfect for small teams getting started.',
        features: [
            'Up to 3 team members',
            'Basic ticket management',
            'Email support',
            'Basic reporting',
        ],
        buttonText: 'Get Started',
        buttonUrl: '#',
        popular: false,
    },
    {
        name: 'Professional',
        price: '49',
        period: 'month',
        description: 'Everything growing support teams need.',
        features: [
            'Up to 10 team members',
            'Advanced ticket management',
            'Priority support',
            'Advanced reporting',
            'Team collaboration',
        ],
        buttonText: 'Start Free Trial',
        buttonUrl: '#',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '99',
        period: 'month',
        description: 'Advanced support for larger organizations.',
        features: [
            'Unlimited team members',
            'Custom workflows',
            'Dedicated support',
            'Advanced analytics',
            'Custom integrations',
        ],
        buttonText: 'Contact Sales',
        buttonUrl: '#',
        popular: false,
    },
];

const normalizePlans = (plans) => {
    const source = Array.isArray(plans) ? plans : DEFAULT_PLANS;

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

const Edit = ({ attributes, setAttributes }) => {
    const heading = attributes.heading ?? 'Simple, Transparent Pricing';
    const description = attributes.description ?? '';
    const pricingPlans = normalizePlans(attributes.plans);

    const blockProps = useBlockProps({
        className: 'deskpilot-pricing',
    });

    const updatePlan = (index, key, value) => {
        const updated = [...pricingPlans];

        updated[index] = {
            ...updated[index],
            [key]: value,
        };

        setAttributes({ plans: updated });
    };

    const updatePlanFeature = (planIndex, featureIndex, value) => {
        const updated = [...pricingPlans];
        const features = [...updated[planIndex].features];

        features[featureIndex] = value;

        updated[planIndex] = {
            ...updated[planIndex],
            features,
        };

        setAttributes({ plans: updated });
    };

    const addFeature = (planIndex) => {
        const updated = [...pricingPlans];

        updated[planIndex] = {
            ...updated[planIndex],
            features: [...updated[planIndex].features, 'New feature'],
        };

        setAttributes({ plans: updated });
    };

    const removeFeature = (planIndex, featureIndex) => {
        const updated = [...pricingPlans];

        updated[planIndex] = {
            ...updated[planIndex],
            features: updated[planIndex].features.filter(
                (_, i) => i !== featureIndex
            ),
        };

        setAttributes({ plans: updated });
    };

    const addPlan = () => {
        setAttributes({
            plans: [
                ...pricingPlans,
                {
                    name: 'New Plan',
                    price: '29',
                    period: 'month',
                    description: 'Describe this pricing plan.',
                    features: ['New feature'],
                    buttonText: 'Get Started',
                    buttonUrl: '#',
                    popular: false,
                },
            ],
        });
    };

    const removePlan = (index) => {
        setAttributes({
            plans: pricingPlans.filter((_, i) => i !== index),
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
                </PanelBody>

                {pricingPlans.map((plan, index) => (
                    <PanelBody
                        key={index}
                        title={`${__('Plan', 'deskpilot')} ${index + 1}: ${plan.name}`}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__('Plan name', 'deskpilot')}
                            value={plan.name}
                            onChange={(value) => updatePlan(index, 'name', value)}
                        />

                        <TextControl
                            label={__('Price', 'deskpilot')}
                            value={plan.price}
                            onChange={(value) => updatePlan(index, 'price', value)}
                        />

                        <TextControl
                            label={__('Billing period', 'deskpilot')}
                            value={plan.period}
                            onChange={(value) => updatePlan(index, 'period', value)}
                        />

                        <TextareaControl
                            label={__('Plan description', 'deskpilot')}
                            value={plan.description}
                            onChange={(value) => updatePlan(index, 'description', value)}
                        />

                        <TextControl
                            label={__('Button text', 'deskpilot')}
                            value={plan.buttonText}
                            onChange={(value) => updatePlan(index, 'buttonText', value)}
                        />

                        <TextControl
                            label={__('Button URL', 'deskpilot')}
                            value={plan.buttonUrl}
                            onChange={(value) => updatePlan(index, 'buttonUrl', value)}
                        />

                        <CheckboxControl
                            label={__('Highlight as popular plan', 'deskpilot')}
                            checked={plan.popular}
                            onChange={(value) => updatePlan(index, 'popular', value)}
                        />

                        <p><strong>{__('Plan features', 'deskpilot')}</strong></p>

                        {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex}>
                                <TextControl
                                    label={`${__('Feature', 'deskpilot')} ${featureIndex + 1}`}
                                    value={feature}
                                    onChange={(value) =>
                                        updatePlanFeature(index, featureIndex, value)
                                    }
                                />

                                <Button
                                    variant="tertiary"
                                    isDestructive
                                    onClick={() => removeFeature(index, featureIndex)}
                                >
                                    {__('Remove feature', 'deskpilot')}
                                </Button>
                            </div>
                        ))}

                        <Button
                            variant="secondary"
                            onClick={() => addFeature(index)}
                        >
                            {__('+ Add Feature', 'deskpilot')}
                        </Button>

                        <hr />

                        <Button
                            variant="tertiary"
                            isDestructive
                            onClick={() => removePlan(index)}
                        >
                            {__('Remove plan', 'deskpilot')}
                        </Button>
                    </PanelBody>
                ))}
            </InspectorControls>

            <section {...blockProps}>
                <div className="deskpilot-pricing__header">
                    <RichText
                        tagName="h2"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter pricing heading...', 'deskpilot')}
                    />

                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder={__('Enter pricing description...', 'deskpilot')}
                    />
                </div>

                <div className="deskpilot-pricing__grid">
                    {pricingPlans.map((plan, index) => (
                        <article
                            className={`deskpilot-pricing-card ${plan.popular ? 'is-popular' : ''}`}
                            key={index}
                        >
                            {plan.popular && (
                                <div className="deskpilot-pricing-card__badge">
                                    {__('Most Popular', 'deskpilot')}
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

                            <Button
                                variant={plan.popular ? 'primary' : 'secondary'}
                                disabled
                            >
                                {plan.buttonText}
                            </Button>
                        </article>
                    ))}
                </div>

                <div className="deskpilot-pricing__actions">
                    <Button variant="primary" onClick={addPlan}>
                        {__('+ Add Pricing Plan', 'deskpilot')}
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Edit;
