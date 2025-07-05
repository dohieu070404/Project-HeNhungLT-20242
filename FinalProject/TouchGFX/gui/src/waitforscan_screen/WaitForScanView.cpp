#include <gui/waitforscan_screen/WaitForScanView.hpp>

extern "C" {
    #include "cmsis_os.h"
}
extern "C" osThreadId_t myTask04Handle;
WaitForScanView::WaitForScanView()
{

}

void WaitForScanView::setupScreen()
{
    WaitForScanViewBase::setupScreen();
    osThreadResume(myTask04Handle);
}

void WaitForScanView::tearDownScreen()
{
    WaitForScanViewBase::tearDownScreen();
    osThreadSuspend(myTask04Handle);
}
extern osMessageQueueId_t myQueue01Handle;
void WaitForScanView::checkCard()
{
	uint8_t tmp;
	if(osMessageQueueGetCount(myQueue01Handle)>0){
		osMessageQueueGet(myQueue01Handle, &tmp, NULL, osWaitForever);
		if(tmp=='A'){
			logInSuccess();
		}

	}
}
