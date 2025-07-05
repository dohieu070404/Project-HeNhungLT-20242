#ifndef WAITFORSCANPRESENTER_HPP
#define WAITFORSCANPRESENTER_HPP

#include <gui/model/ModelListener.hpp>
#include <mvp/Presenter.hpp>

using namespace touchgfx;

class WaitForScanView;

class WaitForScanPresenter : public touchgfx::Presenter, public ModelListener
{
public:
    WaitForScanPresenter(WaitForScanView& v);

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

    virtual ~WaitForScanPresenter() {}

private:
    WaitForScanPresenter();

    WaitForScanView& view;
};

#endif // WAITFORSCANPRESENTER_HPP
