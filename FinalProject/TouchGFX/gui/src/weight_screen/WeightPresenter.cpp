#include <gui/weight_screen/WeightView.hpp>
#include <gui/weight_screen/WeightPresenter.hpp>

WeightPresenter::WeightPresenter(WeightView& v)
    : view(v)
{

}

void WeightPresenter::activate()
{

}

void WeightPresenter::deactivate()
{

}

void WeightPresenter::updateWeight(float newWeight)
{
	view.updateWeightDisplay(newWeight);
}
