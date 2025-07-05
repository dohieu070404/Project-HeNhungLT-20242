#ifndef HISTORYSCREENVIEW_HPP
#define HISTORYSCREENVIEW_HPP

#include <gui_generated/historyscreen_screen/HistoryScreenViewBase.hpp>
#include <gui/historyscreen_screen/HistoryScreenPresenter.hpp>

class HistoryScreenView : public HistoryScreenViewBase
{
public:
    HistoryScreenView();
    virtual ~HistoryScreenView() {}
    virtual void setupScreen();
    virtual void tearDownScreen();
protected:
};

#endif // HISTORYSCREENVIEW_HPP
