#ifndef WEIGHTVIEW_HPP
#define WEIGHTVIEW_HPP

#include <gui_generated/weight_screen/WeightViewBase.hpp>
#include <gui/weight_screen/WeightPresenter.hpp>

class WeightView : public WeightViewBase
{
public:
    WeightView();
    virtual ~WeightView() {}
    virtual void setupScreen();
    virtual void tearDownScreen();
    virtual void updateWeightDisplay(float newWeight);
protected:

};

#endif // WEIGHTVIEW_HPP
