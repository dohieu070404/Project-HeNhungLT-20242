#ifndef HISTORYSCREENPRESENTER_HPP
#define HISTORYSCREENPRESENTER_HPP

#include <gui/model/ModelListener.hpp>
#include <mvp/Presenter.hpp>

using namespace touchgfx;

class HistoryScreenView;

class HistoryScreenPresenter : public touchgfx::Presenter, public ModelListener
{
public:
    HistoryScreenPresenter(HistoryScreenView& v);

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

    virtual ~HistoryScreenPresenter() {}

private:
    HistoryScreenPresenter();

    HistoryScreenView& view;
};

#endif // HISTORYSCREENPRESENTER_HPP
