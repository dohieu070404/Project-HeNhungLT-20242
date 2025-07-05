#ifndef WAITFORSCANVIEW_HPP
#define WAITFORSCANVIEW_HPP
#include "cmsis_os.h"
#include <gui_generated/waitforscan_screen/WaitForScanViewBase.hpp>
#include <gui/waitforscan_screen/WaitForScanPresenter.hpp>

class WaitForScanView : public WaitForScanViewBase
{
public:
    WaitForScanView();
    virtual ~WaitForScanView() {}
    virtual void setupScreen();
    virtual void tearDownScreen();
    virtual void checkCard();

protected:
};

#endif // WAITFORSCANVIEW_HPP
