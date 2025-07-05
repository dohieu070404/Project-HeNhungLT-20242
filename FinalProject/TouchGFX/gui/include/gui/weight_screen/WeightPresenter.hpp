#ifndef WEIGHTPRESENTER_HPP
#define WEIGHTPRESENTER_HPP

#include <gui/model/ModelListener.hpp>
#include <mvp/Presenter.hpp>

using namespace touchgfx;

class WeightView;

class WeightPresenter : public touchgfx::Presenter, public ModelListener
{
public:
    WeightPresenter(WeightView& v);

    /**
     * The activate function is called automatically when this screen is "switched in"
     * (ie. made active). Initialization logic can be placed here.
     */
    virtual void activate();

    /**
     * The deactivate function is called automatically when this screen is "switched out"
     * (ie. made inactive). Teardown functionality can be placed here.
     */
    virtual void deactivate();

    virtual ~WeightPresenter() {}

    virtual void updateWeight(float newWeight) override;

private:
    WeightPresenter();

    WeightView& view;
};

#endif // WEIGHTPRESENTER_HPP
